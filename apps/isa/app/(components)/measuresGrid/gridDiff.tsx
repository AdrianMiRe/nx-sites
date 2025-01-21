{
  saleType === 'diff' && (
    <>
      <Grid container>
        
        <Grid size={4} />
        
        <Grid size={4}>
          <Typography variant='subtitle2' sx={{textAlign: 'center'}}>Ojo Derecho</Typography>
        </Grid>

        <Grid size={4}>
          <Typography variant='subtitle2' sx={{textAlign: 'center'}}>Ojo Izquierdo</Typography>
        </Grid>

      </Grid>

      {
        fieldsData.length > 0 &&
        fields && fields.map(field => {
          const fieldData = fieldsData.find( fieldData => fieldData.field === field.label);
          return (field.name === 'Sphere' ? 
            (
              <Grid key={field.label} container>

                <Grid size={4} sx={{ alignSelf: 'center'}}>
                  <Typography variant='subtitle2'>{fieldData.field}</Typography>
                </Grid>
                
                <Grid size={4} px={1}>
                  <CustomSelect
                    name={`right${field.name}`}
                    eye='right'
                    nextMeasure={ nextMeasure }
                    negativeValues={fieldData.rightValues.negatives}
                    positiveValues={fieldData.rightValues.positives}
                  />
                </Grid>

                <Grid size={4} px={1}>
                  <CustomSelect
                    name={`left${field.name}`}
                    eye='left'
                    nextMeasure={ nextMeasure }
                    negativeValues={fieldData.leftValues.negatives}
                    positiveValues={fieldData.leftValues.positives}
                  />
                </Grid>

              </Grid>
            ): (
              <Grid key={field.label} container>

                <Grid size={4} sx={{ alignSelf: 'center'}}>
                  <Typography variant='subtitle2'>{field.label}</Typography>
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
                            !!fieldData ? fieldData.rightValues.map(data => {
                              return (
                                <MenuItem key={data.id} value={data.id}>
                                  {data.value}
                                </MenuItem>
                              )
                            }): 
                            (
                              <MenuItem key='choose' value='Selecciona'>
                                Selecciona medida anterior
                              </MenuItem>
                            )                              
                          }
                        </Select>
                      </FormControl>
                      
                    }
                  />
                </Grid>

                <Grid size={4} px={1}>
                  <Controller
                    name={ `left${ field.name }` }
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
                          id={ `left${field.name}` }
                          className={'customMeasureField'}
                          { ...field }
                          onChange={ (event) => handleChange(event, 'left', field.name) }
                          sx={{
                            '& > .MuiSelect-select': {
                              display: 'flex',
                              justifyContent: 'center'
                            }
                          }}                        
                        >
                          {
                            !!fieldData ? fieldData.leftValues.map(data => {
                              return (
                                <MenuItem key={data.id} value={data.id}>
                                  {data.value}
                                </MenuItem>
                              )
                            }): 
                            (
                              <MenuItem key='choose' value='Selecciona'>
                                Selecciona medida anterior
                              </MenuItem>
                            )
                          
                          }
                        </Select>
                      </FormControl>
                    }
                  />
                </Grid>

              </Grid>
            )
          )          
        })
      }
    </>
  )
}