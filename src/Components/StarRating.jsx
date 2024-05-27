import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function StarRating({ rating }) {
    const stars = [];

    // Tính toán số lượng và loại sao cần hiển thị
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    // Tạo danh sách các icon sao
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);
    }
    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key={stars.length} icon={faStarHalfAlt} className="star-icon" />);
    }

    return (
        <div className="star-rating">
            {stars.map((star, index) => (
                <span key={index}>{star}</span>
            ))}
        </div>
    );
}

export default StarRating;
