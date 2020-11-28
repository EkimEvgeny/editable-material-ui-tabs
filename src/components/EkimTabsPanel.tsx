import React, { useState, useRef, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {EkimTab, IMuiEkimTabModel, IMuiEkimTabProps} from "./EkimTab";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";

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

/**
 * Represents an infrastructure of TabsPanel component.
 */
export interface IMuiEkimTabPanelProps {
    // Tab models.
    models: Array<IMuiEkimTabModel>;

    //Function to handle text changed in tab.
    tabTextChanged: (oldModel: IMuiEkimTabModel, newText: string) => any;

    // Function to handle tab removing.
    removeTab: (model: IMuiEkimTabModel) => any;

    // Function to handle tab selection.
    selectTab: (model: IMuiEkimTabModel) => any;

    // Function to handle add tab event.
    addTab: () => any;
}

export const EkimTabsPanel: React.FC<IMuiEkimTabPanelProps> =({...props
}: IMuiEkimTabPanelProps) =>
{
    const classes = useStyles();

    // Models to show in tabs.
    const [viewModels, setViewModels] = useState<IMuiEkimTabProps[]>([]);

    const removeTabLocal = (model: IMuiEkimTabProps) => {

    }

    const changeTabCaption = (model: IMuiEkimTabProps, text: string) => {

    }

    const selectTabLocal = (viewModel:IMuiEkimTabProps) => {
        let viewModelsTemp = viewModels.map((viewModelTemp, index) => {
            viewModels[index].isSelected = false;

            if(viewModelTemp.model.id === viewModel.model.id){
                viewModels[index].isSelected = true;
            }

            return viewModelTemp;
        })

        setViewModels(viewModelsTemp);
    }

    useEffect(() => {
        setViewModels (props.models.map((model) => {
            let viewModel = {
                model: model,
                isSelected: false,
                isEditable:true,
                isLoading: false,
                removeTab: removeTabLocal,
                changeTabCaption: changeTabCaption,
                selectTab: selectTabLocal
            } as IMuiEkimTabProps;

            return viewModel;
        }))
    }, [props.models]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container spacing={1} >
                    {viewModels.map((viewModel) => {
                        return(
                            <Grid item key={viewModel.model.id} >
                                <EkimTab key={viewModel.model.id}
                                         model={viewModel.model}
                                         changeTabCaption={changeTabCaption}
                                         removeTab={removeTabLocal}
                                         selectTab={selectTabLocal}
                                         isSelected={viewModel.isSelected}
                                         isEditable={viewModel.isEditable}
                                         isLoading={viewModel.isLoading}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
                <IconButton color="primary" onClick={props.addTab}>
                    <AddIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}