import React from 'react';

const Products = props => {
	return (
		<div className="product_container">
			<div>
				<div>
					{props.product_name}
				</div>
				<div>
					{props.info}
				</div>
				<div>
					{props.product_type}
				</div>
			</div>
		</div>
	);
};
export default Products;
