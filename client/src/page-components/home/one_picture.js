import { useEffect } from 'react';
import '../../styles/home_styles/one_picture.css';

const OnePicture = () => {
    useEffect(() => {
        const scrollHandler = () => {
            const onePicture = document.getElementsByClassName('onePicture')[0];
            if (!onePicture) return;
            const rect = onePicture.getBoundingClientRect();
            const ratio = (window.innerHeight - rect.top) / (rect.height + window.innerHeight);
            const gradImage = document.getElementsByClassName('gradImage')[0];
            gradImage.style.transform = `translateY(${ratio * 100}px)`;
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);


    return (
        <div className="onePicture">
            <div className='outline'>
                <div className="text">
                    Think Design Build

                </div>
                <div className='segment'>
                    <img
                        src={process.env.PUBLIC_URL + "/about_me_main/fieldwide.JPG"}
                        alt="grad"
                        className='gradImage'
                    />
                </div>
            </div>
        </div>
    );
};

export default OnePicture;