import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Projects = () => {
	const [movie, setMovie] = useState();
	const [error, setError] = useState();

	const url = 'https://owen-wilson-wow-api.herokuapp.com/wows/random';

	const options = { method: 'GET', headers: { Accept: 'application/json' } };

	const getWow = () => {
		fetch(url, options)
			.then((response) => response.json())
			.then((response) => {
				setMovie(response[0]);
			})
			.catch((err) => {
				setError(err);
			});
	};
	useEffect(() => {
		getWow();
	}, []);
	if (!movie) {
		return null;
	}
	if (error) {
		return <p>oh no, you encountered an error! try again</p>;
	}
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Card
				className='card'
				variant='outlined'
				sx={{ maxWidth: 400, boxShadow: 3 }}
			>
				<CardMedia
					component='video'
					height='240'
					src={movie.video['1080p']}
					autoPlay
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='div'>
						Wow Generator
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						In {movie.movie}, Owen Wilson plays {movie.character}. He says "Wow"{' '}
						{movie.total_wows_in_movie} times!
					</Typography>
					<CardActions sx={{}} style={{ justifyContent: 'center' }}>
						<Button
							sx={{ mt: 1 }}
							variant='contained'
							type='submit'
							onClick={getWow}
							centered
						>
							Generate
						</Button>
					</CardActions>
				</CardContent>
			</Card>
		</div>
	);
};

export default Projects;
