import Vector2 from '../vector2.js';

class Quad {
    constructor(center, size) {
        this.center = center;
        this.size = size;
    };
    static construct_new_tree(bodies) {
        let min_x = Number.POSITIVE_INFINITY;
        let max_x = Number.NEGATIVE_INFINITY;
        let min_y = Number.POSITIVE_INFINITY;
        let max_y = Number.NEGATIVE_INFINITY;
        bodies.forEach(body => {
            min_x = Math.min(min_x, body.pos.x);
            max_x = Math.max(max_x, body.pos.x);
            min_y = Math.min(min_y, body.pos.y);
            max_y = Math.max(max_y, body.pos.y);
        });
        return new Quad(new Vector2((min_x + max_x) / 2, (min_y + max_y) / 2), Math.max(max_x - min_x, max_y - min_y));
    }
    /*
    * 2 | 3
    * -----
    * 0 | 1
    * */
    into_quad(quadrant) {
        let new_size = this.size / 2;
        let new_center_x = this.center.x + (quadrant % 2 === 0 ? -1 : 1) * new_size / 2;
        let new_center_y = this.center.y + (quadrant < 2 ? -1 : 1) * new_size / 2;
        let new_center = new Vector2(new_center_x, new_center_y);
        return new Quad(new_center, new_size);
    }
    subdivide() {
        return [this.into_quad(0), this.into_quad(1), this.into_quad(2), this.into_quad(3)];
    }
    find_quadrant(pos) {
        let x = pos.x;
        let y = pos.y;
        if (x < this.center.x) {
            if (y < this.center.y) {
                return 0;
            } else {
                return 2;
            }
        } else {
            if (y < this.center.y) {
                return 1;
            } else {
                return 3;
            }
        }
    }
}

class Node {
    constructor(next, quad) {
        this.children = 0;
        this.pos = new Vector2(0, 0);
        this.mass = 0;
        this.next = next
        this.quad = quad;
    };
    is_leaf() {
        return this.children === 0;
    }
    is_branch() {
        return this.children !== 0;
    }
    is_empty() {
        return this.mass === 0;
    }
};

class Quadtree {
    constructor(theta, epsilon) {
        this.nodes = []
        this.parents = []
        this.theta_sq = theta * theta;
        this.epsilon_sq = epsilon * epsilon;
    }
    clear(quad) {
        this.nodes = [];
        this.parents = [];
        this.nodes.push(new Node(0, quad));
    }
    subdivide(node) {
        this.parents.push(node);
        let children = this.nodes.length;
        this.nodes[node].children = children;
        let nexts = [children + 1, children + 2, children + 3, this.nodes[node].next];
        let quads = this.nodes[node].quad.subdivide();
        for (let i = 0; i < 4; i++) {
            this.nodes.push(new Node(nexts[i], quads[i]));
        }
        return children;
    }
    insert(pos, mass) {
        let node = 0;
        while (this.nodes[node].is_branch()) {
            let quad = this.nodes[node].quad.find_quadrant(pos);
            node = quad + this.nodes[node].children;
        }
        if (this.nodes[node].is_empty()) {
            this.nodes[node].pos = pos;
            this.nodes[node].mass = mass;
            return;
        }
        let p = this.nodes[node].pos;
        let m = this.nodes[node].mass;
        if (pos.equals(p)) {
            this.nodes[node].mass += mass;
            return;
        }
        while (true) {
            let children = this.subdivide(node);
            let quad1 = this.nodes[node].quad.find_quadrant(p);
            let quad2 = this.nodes[node].quad.find_quadrant(pos);
            if (quad1 == quad2) {
                node = children + quad1;
            } else {
                let n1 = children + quad1;
                let n2 = children + quad2;
                this.nodes[n1].pos = p;
                this.nodes[n1].mass = m;
                this.nodes[n2].pos = pos;
                this.nodes[n2].mass = mass;
                return
            }
        }
    }
    propogate() {
        this.parents.slice().reverse().forEach((node) => {
            let i = this.nodes[node].children;
            this.nodes[node].mass = this.nodes[i].mass + this.nodes[i + 1].mass + this.nodes[i + 2].mass + this.nodes[i + 3].mass;
            this.nodes[node].pos = this.nodes[i].pos.multiply(this.nodes[i].mass).add(this.nodes[i + 1].pos.multiply(this.nodes[i + 1].mass)).add(this.nodes[i + 2].pos.multiply(this.nodes[i + 2].mass)).add(this.nodes[i + 3].pos.multiply(this.nodes[i + 3].mass));
            this.nodes[node].pos = this.nodes[node].pos.divide(this.nodes[node].mass);
        })
    }
    acc(pos) {
        let acc = new Vector2(0, 0);
        let node = 0;
        while (true) {
            let n = this.nodes[node];
            let distance = n.pos.subtract(pos);
            let distance_squared = distance.magnitude_squared();
            if (distance_squared === 0) {
                distance_squared = this.epsilon_sq;
            }
            if (n.is_leaf() || n.quad.size * n.quad.size < this.theta_sq * distance_squared) {
                let denom = (distance_squared + this.epsilon_sq) * Math.sqrt(distance_squared);
                acc = acc.add(distance.multiply(Math.min(n.mass / denom, Number.POSITIVE_INFINITY)));
                if (n.next == 0) {
                    break;
                }

                node = n.next;
            } else {
                node = n.children;
            }
        }
        return acc;
    }
}

export { Quadtree, Node, Quad };