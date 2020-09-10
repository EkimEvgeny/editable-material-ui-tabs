import React, { useState, useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ClearIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import {EkimTab, IMuiEkimTabModel} from "./EkimTab";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        'visuallyHidden': {
            position: "absolute",
            clip: "rect(0 0 0 0)",
            height: "1px",
            margin: "-1px"
        },
        'labelGrid': {
            display: "flex",
            alignItems: "center"
        },
        'label': {
            paddingLeft:'10px',
        },
        'input': {
            verticalAlign: "middle"
        }
    })
);

export default function EkimTabsPanel() {
    const classes = useStyles();
    const [isEditing, setIsEditing] = useState(false);
    let inputElement = useRef(null);

    let model = {id: "1", text: "", isSelected:false};

    const changeText = (oldModel: IMuiEkimTabModel, newText: String) => {};
    const removeTab = (model: IMuiEkimTabModel) => {};

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" >
                    <EkimTab model={model} changeText={changeText} removeTab={removeTab} />
                </Typography>
                <Button color="inherit">+</Button>
            </Toolbar>
        </AppBar>
    );
}