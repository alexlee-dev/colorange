import * as React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import HeroImage from '../assets/hero.svg';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import useMedia from '../hooks/useMedia';

interface HeroStyleProps {
  size: 'large' | 'small';
}

const useStyles = makeStyles({
  cta: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1.2rem',
    textDecoration: 'none',
  },
  heroContainer: {
    backgroundColor: '#0b0033',
    display: 'flex',
    height: '90vh',
  },
  heroHeading: {
    fontSize: (props: HeroStyleProps) =>
      props.size === 'large' ? '6rem' : '2.5rem',
    fontWeight: 700,
    marginBottom: '20px',
  },
  heroImage: {
    display: (props: HeroStyleProps) =>
      props.size === 'large' ? 'block' : 'none',
    height: '500px',
    position: 'absolute',
    right: '0',
  },
  heroImageContainer: {
    color: 'white',
    width: '33%',
  },
  heroInnerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: (props: HeroStyleProps) =>
      props.size === 'large' ? 'row' : 'column',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '1200px',
  },
  heroTypographyContainer: {
    color: 'white',
    padding: '25px',
    width: '67%',
    zIndex: 1,
  },
  heroSubheading: {
    color: 'rgba(255,255,255,.5)',
    fontSize: (props: HeroStyleProps) =>
      props.size === 'large' ? '34px' : '2rem',
    marginBottom: '20px',
  },
});

const Hero = () => {
  const size = useMedia(
    ['(max-width: 800px)', '(min-width: 800px)'],
    ['small', 'large'],
    'large',
  );
  const props = { size };
  const classes = useStyles(props);

  const addMarginToImage = () => {
    const container = document.getElementById('hero-inner-container');
    const image = document.getElementById('hero-image');
    const marginLeft = window.getComputedStyle(container).marginLeft;

    image.style.marginRight = marginLeft;
  };

  React.useEffect(() => {
    addMarginToImage();

    window.addEventListener('resize', addMarginToImage);
  }, []);

  return (
    <Box className={`main ${classes.heroContainer}`} id="hero-container">
      <Box className={classes.heroInnerContainer} id="hero-inner-container">
        <Box className={classes.heroTypographyContainer}>
          <Typography className={classes.heroHeading} variant="h1">
            Your phone is unorganized.
          </Typography>
          <Typography className={classes.heroHeading} variant="h1">
            Let's fix it.
          </Typography>
          <Typography className={classes.heroSubheading} variant="h2">
            Colorange will make it better.
          </Typography>
        </Box>
        <img
          alt="People jumping for joy."
          className={classes.heroImage}
          id="hero-image"
          src={HeroImage}
        />
        <Link className={classes.cta} id="cta" to="/app">
          <Button color="default" variant="contained">
            Start
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Hero;
