/** @format */

import { Container, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CodeIcon from "@mui/icons-material/Code";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    boxShadow: theme.shadows[3],
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='md' className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant='h4' gutterBottom>
          <AccountCircleIcon className={classes.icon} />
          <CodeIcon className={classes.icon} />
          About Abdelnasser Blogger
        </Typography>
        <Typography variant='body1' paragraph>
          Welcome to Abdelnasser Blogger, a personal blog where I share my
          experiences and stories as a Palestinian and a web developer. My name
          is Abdelnasser, and Im passionate about expressing my thoughts and
          connecting with people through this platform.
        </Typography>
        <Typography variant='body1' paragraph>
          As a Palestinian, I aim to shed light on my unique experiences,
          culture, and the challenges faced by my community. Alongside that, Im
          excited to share insights into my journey as a web developer. Here,
          youll find a blend of personal narratives, technical insights, and
          everything in between.
        </Typography>
        <Typography variant='body1' paragraph>
          Join me on this blogging journey as we explore different aspects of
          life, development, and the intersection of both. Feel free to reach
          out, comment, and engage in discussions. Thank you for being a part of
          Abdelnasser Blogger!
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
