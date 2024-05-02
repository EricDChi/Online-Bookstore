import { Card } from "antd"
import { Link } from "react-router-dom";
import { IMAGE_PREFIX } from "../service/common";

export default function BookCard({ book }) {
    return (
        <Link to={`/book/${book.id}`}>
            <Card className="book-card"
                hoverable
                cover={<img alt={book.title} src={IMAGE_PREFIX + "/" + book.cover} />}
            >
                <p className='title'>{book.title}</p>
                <p className='author'>{book.author}</p>
                <p className='price'>¥ {book.price / 100}</p>
            </Card>
        </Link>
    )
}
