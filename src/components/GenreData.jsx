import { useSelector } from "react-redux";
import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Card,
  Box,
  Button,
  ListSubheader,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

export default function GenreData() {
  const storeGenre = useSelector((store) => store.storeGenre);
  console.log("this is the genreStore from Genre data", storeGenre);
  return (
    <Box>
      <Grid>
        <Card>
          <CardContent>
          <List>
            <ListSubheader>Genres:</ListSubheader>
            {storeGenre.map((genre, i) => (
              <ListItem key={i}>
                <ListItemText primary={genre.name} />
              </ListItem>
            ))}
          </List>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
