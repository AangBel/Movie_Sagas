import { useSelector } from "react-redux";
import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Card,
  Box,
  Button,
} from "@mui/material";

export default function GenreData() {
  const genreStore = useSelector((store) => store.genreStore);
  console.log("this is the genreStore from Genre data", genreStore);
  return (
    <Box>
      <Grid>
        <Card>
          <CardContent>
            {genreStore.map((genre) => (
              <Typography key={genre}>{genre}</Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
