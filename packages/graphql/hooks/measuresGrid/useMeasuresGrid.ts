import { useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { DateTime } from "luxon";
import _ from 'lodash';
import { SelectChangeEvent } from '@mui/material/Select'

import {
  GET_PRODUCT_SPHERE,
  GET_PRODUCT_AXIS,
  GET_PRODUCT_CYLINDER,
  GET_PRODUCT_BASE,
  GET_PRODUCT_DIAMETER,
  GET_PRODUCT_ADD,
  GET_PRODUCT_SKU,
  GET_PRODUCT_COLOR,
} from "../../queries/getMeasures.gql"

import querySubstitution from "../../lib/querySubstitution";
import proxyCalls from "../../lib/proxyCalls";
import { MeasuresFieldsData } from '@repo/graphql/interfaces/measuresFieldsData';

import { MeasuresProps } from '@repo/graphql/interfaces/measuresGrid';
import { isEmpty } from "lodash";

export const useMeasuresGrid = ( props: MeasuresProps ) => {
  
  const {
    product,
    minQty,
    maxQty,
    saleType,
    searchInventory,
    setParentFields,
    handleQtyChange
  } = props;

  const [fieldsData, setFieldsData] = useState<MeasuresFieldsData[]>([]);
  const [globalEye, setGlobalEye] = useState('');
  const [fields, setFields] = useState([]);
  const [leftQty, setLeftQty] = useState(1);
  const [rightQty, setRightQty] = useState(1);
  const [oneEye, setOneEye] = useState('');
  const [searchingMeasure, setSearchingMeasure] = useState(false);
  const [oneMeasure, setOneMeasure] = useState<{eye: string, field: string}>();
  
  const methods = useFormContext();
  const { control, watch, setValue, getValues } = methods;
  
  const setPositivesData = useCallback((data: any, position: number, eye: string, field: string) => {
    let rightValues = [];
    let leftValues = [];
    let itemValue = '';
    let itemId = '';
    let measureT = '';

    const productsData = data.getProductConfiguration[0].products_data;
    
    switch(field) {
      case 'Eje':
        itemValue = 'axis';
        itemId = 'axis_id';
        measureT = 'Axis';
        break;  
      case 'Adicion': 
        itemValue = 'add';
        itemId = 'add_id';
        measureT = 'Add';
        break;
      case 'Curva Base':
        itemValue = 'base_curve';
        itemId = 'base_curve_id';
        measureT = 'Base_curve';
        break;
      case 'Diámetro':
        itemValue = 'diameter';
        itemId = 'diameter_id';
        measureT = 'Diameter';
        break;
      default:
        itemValue = 'item_value';
        itemId = 'item_id';
        break;
    }

    let positives = productsData.filter((values: any) => parseFloat(values[itemValue]) >= 0).map((value: any) => {
      return {
        id: value[itemId],
        value: value[itemValue],
        parsedValue: parseFloat(value[itemValue])
      }
    });

    positives = _.orderBy(positives, ['parsedValue'], ['asc'])

    if (eye === 'left') {
      leftValues = positives;
    } else {
      if (eye !== "") {
        rightValues = positives;
      } else {
        leftValues = positives;
        rightValues = positives;
      }
    }
    
    let productData = [];
    const fieldToFind = field.substring(0, 1).toUpperCase() + field.substring(1);

    const foundedField = fieldsData.findIndex((fieldData) => fieldData.field === fieldToFind);
    if ( foundedField === -1 ) {
      productData = [
        ...fieldsData,
        {
          field: fieldToFind,
          leftValues,
          rightValues,
          leftFieldOrder: eye === 'left' ? position : 9,
          rightFieldOrder: eye === 'right' ? position : 9,
        }
      ];
    } else {

      if (eye === 'left' && fieldsData[foundedField])
        fieldsData[foundedField].leftFieldOrder = position;

      const newProductData = [
        ..._.orderBy(fieldsData, [ eye === 'left' ? 'leftFieldOrder' : 'rightFieldOrder' ], ['asc'])
      ];

      const mantain = newProductData.slice();
      const modify = newProductData.slice();
      
      mantain.splice(position);
      modify.splice(0, position);

      if (position > 0 && mantain[position - 1]) {
        if (eye === 'left') {
          // mantain[position - 1].leftValues = leftValues;
          modify.map(mod => {
            mod.leftValues = { positives: [], negatives: []};
          });          
        } else {
          // mantain[position - 1].rightValues = rightValues;
          modify.map(mod => {
            mod.rightValues = { positives: [], negatives: []};
          });
        }
      }

      productData = [
        ...mantain,
        ...modify
      ];
    }

    setFieldsData(productData);

    if (positives.length === 1) {
      let eField = '';

      if (eye !== '') {
        if (eye === 'left') {
          eField = `left${measureT}`;
        } else {
          eField = `right${measureT}`;
        }
        setValue(eField, positives[0].id);
        setOneMeasure({ eye, field: eField });
      } else {
        setValue(`right${measureT}`, positives[0].id);
        setValue(`left${measureT}`, positives[0].id);
        setOneMeasure({ eye, field: `right${measureT}` });
        setOneMeasure({ eye, field: `left${measureT}` });
      }

    }
  }, [fieldsData]);

  const setNegativesData = useCallback((data: any, position: number, eye: string, field: string) => {
    let rightValues = [];
    let leftValues = [];
    let itemValue = '';
    let itemId = '';

    const productsData = data.getProductConfiguration[0].products_data;

    switch (field) {
      case 'Cilindro':
        itemValue = 'cylinder';
        itemId = 'cylinder_id';
        break;
      default:
        itemValue = 'item_value';
        itemId = 'item_id';
        break;
    }

    let negatives = productsData.filter((values: any) => parseFloat(values[itemValue]) < 0).map((value: any) => {
      return {
        id: value[itemId],
        value: value[itemValue],
        parsedValue: parseFloat(value[itemValue])
      }
    });

    negatives = _.orderBy(negatives, ['parsedValue'], ['desc']);

    if (eye === 'left') {
      leftValues = negatives;
    } else {
      if (eye !== "") {
        rightValues = negatives;
      } else {
        leftValues = negatives;
        rightValues = negatives;
      }
    }

    let productData = [];
    const fieldToFind = field.substring(0, 1).toUpperCase() + field.substring(1);

    const foundedField = fieldsData.findIndex(fieldData => fieldData.field === fieldToFind);
    if ( foundedField === -1 ) {
      productData = [
        ...fieldsData,
        {
          field: fieldToFind,
          leftValues,
          rightValues,
          leftFieldOrder: eye === 'left' ? position : 9,
          rightFieldOrder: eye === 'right' ? position : 9,
        }
      ];
    } else {
      if (eye === 'left' && fieldsData[foundedField])
        fieldsData[foundedField].leftFieldOrder = position;

      const newProductData = [
        ..._.orderBy(fieldsData, [ eye === 'left' ? 'leftFieldOrder' : 'rightFieldOrder' ], ['asc'])
      ];

      const mantain = newProductData.slice();
      const modify = newProductData.slice();
      
      mantain.splice(position);
      modify.splice(0, position);

      if (position > 0 && mantain[position - 1]) {
        if (eye === 'left') {
          // mantain[position - 1].leftValues = leftValues;
          modify.map(mod => {
            mod.leftValues = { positives: [], negatives: []};
          });          
        } else {
          // mantain[position - 1].rightValues = rightValues;
          modify.map(mod => {
            mod.rightValues = { positives: [], negatives: []};
          });
        }
      }

      productData = [
        ...mantain,
        ...modify
      ];
    }

    setFieldsData(productData);
  }, [fieldsData]);

  const setColorData = useCallback((data: any, position: number, eye: string, field: string) => {

  }, []);

  const searchSphereQ = useCallback( async() => {
    setSearchingMeasure(true);
    const variables = {
      name: product.name,
      sphere: null,
      axis: null,
      cylinder: null,
      base_curve: null,
      diameter: null,
      add: null,
      time: DateTime.now()
    }

    const getSphereQ = querySubstitution(GET_PRODUCT_SPHERE, variables);

    const { data, errors } = await proxyCalls(getSphereQ);

    if (errors) {
      console.log(errors)
      setSearchingMeasure(false);
      return;
    }

    if (data) {
      const fieldsData = data && data.getProductConfiguration[0].fields;
      const productsData = data && data.getProductConfiguration[0].products_data;

      const productFields = fieldsData.map((field: {label: string, name: string}) => {
        return {
          label: field.label,
          name: field.name.charAt(0).toUpperCase() + field.name.slice(1)
        }
      });

      if (productsData.length === 1) {
        let field = '';

        if (globalEye !== "") {
          if (globalEye === 'left') {
            field = 'leftSphere';
          } else {
            field = 'rightSphere';
          }
          setValue(field, productsData[0].sphere_id);
        } else {
          setValue('leftSphere', productsData[0].sphere_id);
          setValue('rightSphere', productsData[0].sphere_id);
        }

        const searchValue = productsData[0].sphere_id;
        // searchCyl(globalEye, searchValue);
      }

      let positives = productsData.filter((values: any) => parseFloat(values.sphere) >= 0).map( (values: any) => {
        return {
          id: values.sphere_id,
          value: values.sphere,
          parsedValue: parseFloat(values.sphere)
        }
      });

      let negatives = productsData.filter((values: any) => parseFloat(values.sphere) < 0).map( (values: any) => {
          return {
            id: values.sphere_id,
            value: values.sphere,
            parsedValue: parseFloat(values.sphere)
          };
      });
      
      positives = _.orderBy(positives, ['parsedValue'], ['asc']);
      negatives = _.orderBy(negatives, ['parsedValue'], ['desc']);
      
      positives = [{value: '+', id: '+'}, ...positives];
      negatives = [{value: '-', id: '-'}, ...negatives];
      
      const productData = [{
        field: 'Esfera',
        leftValues: {
          positives,
          negatives
          
        },
        rightValues: {
          positives,
          negatives
        },
        leftFieldOrder: 1,
        rightFieldOrder: 1
      }];

      setFields(productFields);
      setFieldsData(productData);
      setSearchingMeasure(false);
    }

  }, [product])

  const searchCylQ = useCallback(async(eye: string, position: number) => {
    setSearchingMeasure(true);

    const variables = {
      name: product.name,
      sphere: watch(`${eye}SphereId`) !== '' ? watch(`${eye}SphereId`) : null,
      axis: null,
      cylinder: null,
      base_curve: null,
      diameter: null,
      add: null,
      time: DateTime.now()
    }

    const getCylinderQ = querySubstitution(GET_PRODUCT_CYLINDER, variables);

    const {data, errors} = await proxyCalls(getCylinderQ);
    
    if (errors) {
      console.error(errors);
      setSearchingMeasure(false);
      return;
    }

    if (data) {
      setNegativesData(data, position, eye, 'Cilindro')
      setSearchingMeasure(false);
    }

  }, [fieldsData])

  const searchAxisQ = useCallback(async(eye: string, position: number) => {
    setSearchingMeasure(true);

    const variables = {
      name: product.name,
      sphere: watch(`${eye}SphereId`) !== '' ? watch(`${eye}SphereId`) : null,
      cylinder: watch(`${eye}Cylinder`) !== '' ? watch(`${eye}Cylinder`) : null,
      axis: null,
      base_curve: null,
      diameter: null,
      add: null,
      time: DateTime.now()
    }

    const getAxisQ = querySubstitution(GET_PRODUCT_AXIS, variables);

    const {data, errors} = await proxyCalls(getAxisQ);
    
    if (errors) {
      console.error(errors);
      setSearchingMeasure(false);
      return;
    }

    if (data) {
      setPositivesData(data, position, eye, 'Eje')
      setSearchingMeasure(false);
    }
  }, [fieldsData])

  const searchBaseQ = useCallback(async(eye: string, position: number) => {
    setSearchingMeasure(true);

    const variables = {
      name: product.name,
      sphere: watch(`${eye}SphereId`) !== '' ? watch(`${eye}SphereId`) : null,
      cylinder: watch(`${eye}Cylinder`) !== '' ? watch(`${eye}Cylinder`) : null,
      axis: watch(`${eye}Axis`) !== '' ? watch(`${eye}Axis`) : null,
      base_curve: null,
      diameter: null,
      add: null,
      time: DateTime.now()
    }

    const getBaseQ = querySubstitution(GET_PRODUCT_BASE, variables);

    const {data, errors} = await proxyCalls(getBaseQ);
    
    if (errors) {
      console.error(errors);
      setSearchingMeasure(false);
      return;
    }

    if (data) {
      setPositivesData(data, position, eye, 'Curva Base')
      setSearchingMeasure(false);
    }
  }, [fieldsData])

  const searchDiameterQ = useCallback(async(eye: string, position: number) => {
    setSearchingMeasure(true);

    const variables = {
      name: product.name,
      sphere: watch(`${eye}SphereId`) !== '' ? watch(`${eye}SphereId`) : null,
      cylinder: watch(`${eye}Cylinder`) !== '' ? watch(`${eye}Cylinder`) : null,
      axis: watch(`${eye}Axis`) !== '' ? watch(`${eye}Axis`) : null,
      base_curve: watch(`${eye}Base_curve`) !== '' ? watch(`${eye}Base_curve`) : null,
      diameter: null,
      add: null,
      time: DateTime.now()
    }

    const getDiameterQ = querySubstitution(GET_PRODUCT_DIAMETER, variables);

    const {data, errors} = await proxyCalls(getDiameterQ);
    
    if (errors) {
      console.error(errors);
      setSearchingMeasure(false);
      return;
    }

    if (data) {
      setPositivesData(data, position, eye, 'Diámetro')
      setSearchingMeasure(false);
    }
  }, [fieldsData])

  const searchSkuQ = useCallback(async(eye: string) => {
    setSearchingMeasure(true);

    const variables = {
      name: product.name,
      sphere: watch(`${eye}SphereId`) !== '' ? watch(`${eye}SphereId`) : null,
      cylinder: watch(`${eye}Cylinder`) !== '' ? watch(`${eye}Cylinder`) : null,
      axis: watch(`${eye}Axis`) !== '' ? watch(`${eye}Axis`) : null,
      base_curve: watch(`${eye}Base_curve`) !== '' ? watch(`${eye}Base_curve`) : null,
      diameter: watch(`${eye}Diameter`) !== '' ? watch(`${eye}Diameter`) : null,
      add: null,
      color: null,
      time: DateTime.now()
    }

    const getSkuQ = querySubstitution(GET_PRODUCT_SKU, variables);

    const {data, errors} = await proxyCalls(getSkuQ);
    
    if (errors) {
      console.error(errors);
      setSearchingMeasure(false);
      return;
    }

    if (data) {
      const skud = data && data.getProductConfiguration[0].products_data[0].sku;

      if (eye === 'left') {
        setValue('leftSku', skud)
      } else {
        setValue('rightSku', skud)
      }

      setSearchingMeasure(false);
      searchInventory(eye)
    }
  }, [fieldsData])

  useEffect( () => {
    searchSphereQ();
  }, []);
  
  useEffect (() => {
    searchSphereQ();
  }, [ saleType ]);

  useEffect(() => {
    if (isEmpty(oneMeasure)) return;

    nextMeasure(oneMeasure.eye, oneMeasure.field);
  }, [oneMeasure])
  
  const handleRemove = (eye: string) => {

    if(saleType !== 'diff') {
      if (watch('rightQuantity') - 1 < minQty) return;
      setValue('rightQuantity', watch('rightQuantity') - 1);
    } else {
      
      if ((watch('leftQuantity') + watch('rightQuantity')) - 2 < minQty) return;
      
      setValue('leftQuantity' ,watch('leftQuantity') - 1);
      setValue('rightQuantity', watch('rightQuantity') - 1);
    }

    handleQtyChange(watch('leftQuantity') + watch('rightQuantity'));

  }

  const handleAdd = (eye: string) => {
    
    if(saleType !== 'diff') {
      if (watch('rightQuantity') + 1 > maxQty) return;
      setValue('rightQuantity', watch('rightQuantity') + 1);
    } else {
      
      if ((watch('leftQuantity') + watch('rightQuantity')) + 2 > maxQty) return;
      
      setValue('leftQuantity' ,watch('leftQuantity') + 1);
      setValue('rightQuantity', watch('rightQuantity') + 1);
    }

    handleQtyChange(watch('leftQuantity') + watch('rightQuantity'));

  }

  // const handleOneEye = (e) => {
  //   setOneEye(e.target.value);
  //   methods.setValue('eye', e.target.value);
  // }
  
  // const getSphereValue = (eye, field, value) => {
    
  //   let searchValue = '';
  //   const fData = fieldsData.find(fd => fd.field === field);
    
  //   if (eye === 'left' && parseFloat(value) >= 0) {
  //     searchValue = fData.leftValues.positives.find(sd => sd.value === value).id;
  //   } else if ( eye === 'left' && parseFloat(value) < 0) {
  //     searchValue = fData.leftValues.negatives.find(sd => sd.value === value).id;
  //   } else if (eye === 'right' && parseFloat(value) >= 0) {
  //     searchValue = fData.rightValues.positives.find(sd => sd.value === value).id;
  //   } else if (eye === 'right' && parseFloat(value) < 0) {
  //     searchValue = fData.rightValues.negatives.find(sd => sd.value === value).id;
  //   } else if (eye === '' && parseFloat(value) >= 0) {
  //     searchValue = value;
  //   }

  //   return searchValue;
  // }
  
  const nextMeasure = useCallback( (eye: string, field: string) => {
    const name = product.name;
    const indicadoPara = product.indicadoPara;

    console.log(name, indicadoPara)

    switch ( indicadoPara ) {
      case 5443:
      case 5445:
        if (field === 'Sphere') {
          searchBaseQ(eye, 2)
        } else if ( field.includes('Base_curve') ) {
          searchDiameterQ(eye, 3)
        } else if ( field.includes('Diameter') ) {
          searchSkuQ(eye)
        }
        break;
      case 5444:
        if (field === 'Sphere') {
          searchCylQ(eye, 2);
        } else if (field.includes('Cylinder')) {
          searchAxisQ(eye, 3);
        } else if (field.includes('Axis')) {
          searchBaseQ(eye, 4)
        } else if (field.includes('Base_curve') ) {
          searchDiameterQ(eye, 5)
        } else if ( field.includes('Diameter') ) {
          searchSkuQ(eye)
        }
        break;
      default:
        break;
    }
  }, [fieldsData])

  const handleChange = useCallback((event: SelectChangeEvent , eye: string, fieldName: string) => {
    setValue(`${fieldName}`, event.target.value);
    nextMeasure(eye, fieldName);
  }, [fieldsData]) 

  // const loading = initialLoading || loadingAxis || loadingCyl || loadingBase || loadingDiameter || loadingAdd || loadingSku;
  const loading = searchingMeasure

  return {
    fields,
    control,
    fieldsData,
    leftQty,
    rightQty,
    oneEye,
    nextMeasure,
    handleRemove,
    handleAdd,
    // handleOneEye,
    loading,
    getValues,
    handleChange
  }
}
