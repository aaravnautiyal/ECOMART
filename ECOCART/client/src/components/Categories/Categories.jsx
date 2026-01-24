import {categoryCertifications} from './categoryCerts'

export const Categories = () => (
	<div className="list-group">
		{Object.keys(categoryCertifications).map((cat) => (
			<a href='#' className='list-group-item list-group-item-action' key={cat} value={cat}>
				{cat[0].toUpperCase() + cat.slice(1)}
			</a>
		))}
	</div>
);
