import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProductDetails } from "./productSlice"
import "./productDetails.css"

const ProductDetails = () => {
    const navigate = useNavigate()
    const { productId } = useParams()
    const dispatch = useDispatch()
    const { loading, data } = useSelector((state) => state.product.productDetails)
    console.log(loading, data);
    const [selectedImg, setSelectedImg] = useState()

    useEffect(() => {
        if (productId) {
            dispatch(getProductDetails(productId))
        }
    }, [productId])
    useEffect(() => {
        if (data && data?.images && data.images.length > 0) {
            setSelectedImg(data.images[0])
        }
    }, [data])
    const handleClick = (id) => {
        navigate(`/cartproduct/${id}`)
    }
    return (
        <>
            {loading ?
                <p>Loading...</p>
                :
                <div className="card-wrapper">
                    <div className="card">
                        <div className="product-imgs">
                            <div className="img-display">
                                <div className="img-showcase">
                                    <img src={selectedImg} alt="shoe image" />
                                </div>
                            </div>
                            <div className="img-select">
                                {data?.images?.map((image, idx) => {
                                    return (
                                        <div className={`img-item ${selectedImg == image ? 'border' : ''}`} onClick={() => {
                                            setSelectedImg(image)
                                        }}>
                                            <a href="#" data-id={idx + 1}>
                                                <img src={image} alt="shoe image" />
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="product-content">
                            <h2 className="product-title">{data?.title}</h2>
                            <a href="#" className="product-link">visit {data?.brand} store</a>
                            <div className="product-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                                <span>{data?.rating?.toFixed(1)}({data?.stock})</span>
                            </div>

                            <div className="product-price">
                                <p className="last-price">Old Price: <span>${data?.price}</span></p>
                                <p className="new-price">New Price: <span>${(data?.price - (data?.price * data?.discountPercentage) / 100).toFixed(2)} ({data?.discountPercentage}%)</span></p>
                            </div>

                            <div className="product-detail">
                                <h2>about this item: </h2>
                                <p>{data?.description}</p>
                                <ul>
                                    <li>Available: <span>{data?.stock ? `in stock` : `out of stock`}</span></li>
                                    <li>Category: <span>{data?.category}</span></li>
                                    <li>Shipping Fee: <span>Free</span></li>
                                </ul>
                            </div>

                            <div className="purchase-info">
                                <input type="number" min="0" value="1" />
                                <Link to={`/cartproduct/${data?.id}`}>
                                    <button type="button" className="btn" onClick={handleClick}>
                                        Add to Cart <i className="fas fa-shopping-cart"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default ProductDetails