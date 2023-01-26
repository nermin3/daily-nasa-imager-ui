import { useEffect, useState } from 'react';
import { ImageService } from '../../service/imageService';
import './image.css';

const Image = () => {
    const imageService = new ImageService();
    const [dailyData, setDailyData] = useState<{url: string, explanation: string}>();

    useEffect(() => {
        imageService.getImageData().then(resp => {
            setDailyData({...resp});
        });
    }, []);

    const {url, explanation} = dailyData || {};
    return (
        <div className="image-container">
            <img className="image" src={url} title={explanation} alt="Daily NASA Image" />
        </div>
    )
}

export default Image