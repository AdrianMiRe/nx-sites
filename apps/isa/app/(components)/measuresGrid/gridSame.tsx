import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem"

import { Controller, useFormContext } from "react-hook-form"

import { MeasuresFieldsData, FieldsData, SelectValues } from "@repo/graphql/interfaces/measuresFieldsData"
import { CustomSelect } from "../customSelect/customSelect"

interface MeasureTypeProps {
  fieldsData: MeasuresFieldsData[]
  fields: FieldsData[]
  nextMeasure: (eye: string, field: string) => void
  handleChange: (x1: SelectChangeEvent, x2: string, x3: string) => void
}

const GridSame = (
    {
      fieldsData,
      fields,
      nextMeasure,
      handleChange,
    }: MeasureTypeProps
  ) => {

  const { control } = useFormContext();

  return (
    <Grid
      container
      flexDirection={'column'}
      gap={.5}
      flexWrap={'nowrap'}
    >
      <Grid offset={6} size={4}>
        <Typography
          variant="subtitle2"
          textAlign={"center"}
        >
          Ambos Ojos
        </Typography>
      </Grid>

      {
        fieldsData.length > 0 &&
        fields && fields.map( (field: FieldsData) => {
          const fieldData: MeasuresFieldsData | undefined = fieldsData.find( (fieldData: MeasuresFieldsData) => fieldData?.field === field.label );
          return (
            field.name === 'Sphere'
            ? <Grid key={field.label} container>
                <Grid
                  offset={2}
                  size={4}
                  alignSelf={'center'}
                >
                  <Typography variant="subtitle2">{ fieldData?.field }</Typography>
                </Grid>

                <Grid size={4} px={1}>
                  <CustomSelect
                    name={`right${field.name}`}
                    eye={'right'}
                    nextMeasure={nextMeasure}
                    negativeValues={fieldData?.rightValues?.negatives}
                    positiveValues={fieldData?.rightValues?.positives}
                  />
                </Grid>
              </Grid>
            : <Grid key={field.label} container>
                <Grid
                  offset={2}
                  size={4}
                  alignSelf={'center'}
                >
                  <Typography variant="subtitle2">{ field.label }</Typography>
                </Grid>

                <Grid size={4} px={1}>
                  <Controller
                    name={ `right${ field.name }` }
                    control={ control }
                    render={ ({ field }) =>
                      <FormControl
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{
                          display: 'flex',
                          justifyContent: 'start'
                        }}
                      >
                        <Select
                          id={ `right${field.name}` }
                          className={'customMeasureField'}
                          { ...field }
                          onChange={ (event) => {
                            handleChange(event, 'right', field.name)
                          } }
                          sx={{
                            '& > .MuiSelect-select': {
                              display: 'flex',
                              justifyContent: 'center'
                            }
                          }}
                        >
                          {
                            !!fieldData ? fieldData && Array.isArray(fieldData.rightValues) ? (
                              fieldData.rightValues.map((data: SelectValues) => {
                                return (
                                  <MenuItem key={data.id} value={data.id}>
                                    {data.value}
                                  </MenuItem>
                                );
                              })
                            ) : null
                            :
                            <MenuItem key='choose' value='Selecciona'>
                              Selecciona medida anterior
                            </MenuItem>
                          }
                        </Select>
                      </FormControl>
                      
                    }
                  />
                </Grid>
              </Grid>
          )
        })
      }

    </Grid>
  )
}

export default GridSame