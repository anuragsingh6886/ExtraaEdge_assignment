import { Drawer, Divider, Box, Select, Card, CardActionArea, CardActions, CardContent, MenuItem, Typography, ListItem, List, ListItemText, Button, CardHeader } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { minWidth } from '@mui/system';
const cities = [
    { 'name': 'Delhi', 'lat': '28.679079', 'long': '77.069710' },
    { 'name': 'Mumbai', 'lat': '19.076090', 'long': '72.877426' },
    { 'name': 'Lucknow', 'lat': '26.850000', 'long': '80.949997' },
    { 'name': 'Bengaluru', 'lat': '12.9716', 'long': '77.5946' },
];
export default function Weather() {
    const [selectedCity, setSelectedCity] = useState("Delhi");
    const [currentWeather, setCurrentWeather] = useState({});
    const [weatherForecast, setWeatherForecast] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentDataLoaded, setCurrentDataLoaded] = useState(false);
    const [drawerOpen,setDrawerOpen] = useState(false);
    const handleCitySelection = (event) => {
        setSelectedCity(event.target.value)
    }
    const API_key = "3fbb2b31fd3e77c536be64abc677a4d1";
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_key}&units=metric`).then((response) => (response.json())).then((json) => {
            setCurrentWeather(json.main);
            setCurrentDataLoaded(true);
        });
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_key}&units=metric`).then((response) => (response.json())).then((json) => {
            const list = [];
            json.list.map((index, item) => { if ((index + 1) % 8 == 0 || index == 0) { list.add(item) } })
            list.push(json.list[7], json.list[15], json.list[23], json.list[31], json.list[39]);
            console.log(list);
            setWeatherForecast(list);
            setDataLoaded(true);
        });
        //api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
    }, [selectedCity]);
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width:'100vw' }}>
            <Box sx={{display:'flex', height:'5%', padding:'10px',paddingLeft:'10px', width:'100vw'}}>
                <Link to="/">Logout</Link>
            </Box>
            <Typography variant="h6">Select City</Typography>
            <Select
                labelId="select-city-label"
                id="select-city"
                value={selectedCity}
                label="Select City"
                onChange={handleCitySelection}
                sx={{ width: '20%', margin: '2px', minWidth:'120px' }}
            >
                {cities.map((item) => (<MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>))}
            </Select>
            <Box sx={{ display: 'flex', alignItems: 'start', padding: '10px', flexWrap: 'wrap' }}>
                <Card sx={{ maxWidth: '400px', minWidth: '350px', margin: '10px' }}>
                    <CardHeader title="Current Weather Report"/>
                    {currentDataLoaded?<CardContent>
                        <Typography variant='subtitle1'>Temperature: {currentWeather.temp} °C</Typography>
                        <Typography variant='subtitle1'>Pressure: {currentWeather.pressure}</Typography>
                        <Typography variant='subtitle1'>Humidity: {currentWeather.humidity}</Typography>
                        <Typography variant='subtitle1'>Min Temperature: {currentWeather.temp_min} °C</Typography>
                        <Typography variant='subtitle1'>Max Temperature: {currentWeather.temp_max} °C</Typography>
                        <Typography variant='subtitle1'>Feels Like: {currentWeather.feels_like} °C</Typography>
                    </CardContent>:<>Loading...</>}
                    
                </Card>
                <Card sx={{ maxWidth: '400px', minWidth: '350px', margin: '10px' }}>
                <CardHeader title="5 days Weather Forecast"/>
                    <CardContent>
                        <List>
                            {dataLoaded ? weatherForecast.map((item) => (
                                <>
                                    <ListItem>
                                        <ListItemText primary={item.dt_txt.split(" ")[0]} secondary={<React.Fragment>
                                            <Typography variant='body2'>Temperature: {item.main.temp}</Typography>
                                            <Typography variant='body2'>Pressure: {item.main.pressure}</Typography>
                                            <Typography variant='body2'>Humidity: {item.main.humidity}</Typography>

                                        </React.Fragment>} />
                                    </ListItem>
                                    <Divider variant="fullWidth" />
                                </>
                            )) : <>Loading...</>}
                        </List>
                    </CardContent>
                </Card>
            </Box>
            <Drawer
                anchor='right'
                open={drawerOpen}
                onClose={()=>{setDrawerOpen(false)}}
            >
                This area is for About Us
            </Drawer>
            <Button onClick={()=>{setDrawerOpen(true)}}> About Us</Button>
        </Box>
    );
}