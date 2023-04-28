import { Button, Icon } from "@mui/material";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export function CharacterSearchForm(props: any) {


    const handleSubmit = (evt: any) => {
        evt.preventDefault();



        fetch("https://pointy-gauge.glitch.me/api/form", {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log("Success:", JSON.stringify(response)))
            .catch(error => console.error("Error:", error));
    };

    const handleInput = (evt: any) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        console.log(newValue)

    };


    return (
        <div>
            <Paper>
                <Typography variant="h5" component="h3">
                    {props.formName}
                </Typography>
                <Typography component="p">{props.formDescription}</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        id="margin-normal"
                        name="name"
                        helperText="Enter your full name"
                        onChange={handleInput}
                    />
                    <TextField
                        label="Email"
                        id="margin-normal"
                        name="email"

                        helperText="e.g. name@gmail.com"
                        onChange={handleInput}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"

                    >
                        Subscribe <Icon >send</Icon>
                    </Button>
                </form>
            </Paper>
        </div >
    );
}
