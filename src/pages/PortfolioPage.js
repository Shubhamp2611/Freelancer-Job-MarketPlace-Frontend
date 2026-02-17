import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  ImageList,
  ImageListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Tabs,
} from '@mui/material';
import { useState as useStateLocal } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PortfolioPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useSelector(state => state.auth || {});

  // Mock portfolio data
  const portfolio = {
    projects: [
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce platform built with React and Node.js',
        category: 'Web Development',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        completedDate: '2024-01-15',
        clientRating: 5,
        clientName: 'Tech Company Inc',
        projectUrl: 'https://example-ecom.com',
        details: 'Developed a complete e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.',
      },
      {
        id: 2,
        title: 'Mobile Weather App',
        description: 'Cross-platform weather application using React Native',
        category: 'Mobile Development',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['React Native', 'Firebase', 'OpenWeather API'],
        completedDate: '2023-12-10',
        clientRating: 4.8,
        clientName: 'StartUp Co',
        projectUrl: null,
        details: 'Built a weather app with real-time data, location services, and offline capabilities.',
      },
      {
        id: 3,
        title: 'Data Analytics Dashboard',
        description: 'Interactive dashboard for business analytics',
        category: 'Data Science',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['Python', 'D3.js', 'PostgreSQL', 'Flask'],
        completedDate: '2023-11-20',
        clientRating: 4.9,
        clientName: 'Analytics Pro',
        projectUrl: 'https://example-dashboard.com',
        details: 'Created an interactive dashboard with real-time data visualization and predictive analytics.',
      },
      {
        id: 4,
        title: 'UI Design System',
        description: 'Comprehensive design system for web applications',
        category: 'Design',
        image: 'https://via.placeholder.com/300x200',
        technologies: ['Figma', 'React', 'Storybook'],
        completedDate: '2023-10-05',
        clientRating: 5,
        clientName: 'Design Agency',
        projectUrl: null,
        details: 'Designed a complete design system with 100+ components and comprehensive documentation.',
      },
    ],
    stats: {
      totalProjects: 28,
      completedProjects: 25,
      totalRevenue: 45000,
      averageRating: 4.85,
      yearsExperience: 5,
    },
  };

  const handleOpenDialog = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Portfolio
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Showcase of my best work and projects
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {portfolio.stats.totalProjects}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Projects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {portfolio.stats.completedProjects}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {portfolio.stats.averageRating}★
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Rating
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                ${portfolio.stats.totalRevenue}k
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Projects" />
          <Tab label="Skills" />
          <Tab label="Testimonials" />
        </Tabs>
      </Box>

      {/* Projects Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          {portfolio.projects.map(project => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6">{project.title}</Typography>
                    <Chip
                      label={project.category}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                      Technologies:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.technologies.map((tech, idx) => (
                        <Chip
                          key={idx}
                          label={tech}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Completed: {new Date(project.completedDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog(project)}
                  >
                    View Details
                  </Button>
                  {project.projectUrl && (
                    <Button
                      size="small"
                      href={project.projectUrl}
                      target="_blank"
                    >
                      Visit Live
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Skills Tab */}
      {tabValue === 1 && (
        <Grid container spacing={2}>
          {[
            { category: 'Frontend', skills: ['React', 'Vue.js', 'Angular', 'CSS', 'HTML5'] },
            { category: 'Backend', skills: ['Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB'] },
            { category: 'Mobile', skills: ['React Native', 'Flutter', 'iOS', 'Android'] },
            { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Figma', 'Jira'] },
          ].map((skillGroup, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {skillGroup.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillGroup.skills.map((skill, sIdx) => (
                      <Chip
                        key={sIdx}
                        label={skill}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Testimonials Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          {portfolio.projects.map(project => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">{project.clientName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {'★'.repeat(Math.floor(project.clientRating))}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    Great work on this project! Highly recommended for future collaborations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Project Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.title}</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <CardMedia
                  component="img"
                  image={selectedProject.image}
                  alt={selectedProject.title}
                  sx={{ borderRadius: 1, mb: 2 }}
                />
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {selectedProject.details}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Client Rating: {selectedProject.clientRating}★
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed: {new Date(selectedProject.completedDate).toLocaleDateString()}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              {selectedProject.projectUrl && (
                <Button
                  variant="contained"
                  href={selectedProject.projectUrl}
                  target="_blank"
                >
                  Visit Live
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default PortfolioPage;
