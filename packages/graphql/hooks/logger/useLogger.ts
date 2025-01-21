import { DateTime } from 'luxon';
import proxyCalls from '../../lib/proxyCalls';
import useStorage from '../storage/useStorage';

import LoggerInput from '../../interfaces/loggerInput';

const ADD_LOG_ITEM = `
  mutation AddLogItem { addLogItem(log_id: {logId}, program: {program}, message: {message}, level: {level}, stack_trace: {trace}, created_at: {date}, store_code: {store}) { code message }}
`

const formatString = (template: string, values: Record<string, any>) => {
  return template.replace(/{(\w+)}/g, (match, key) => {
    let value = values[key];
    if (typeof value === "string") {
      // Escape double quotes in string values
      value = value.replace(/"/g, '\\"');
      return `"${value}"`; // Wrap strings in quotes
    }
    return value !== undefined ? value : match;
  });
};

const useLogger = () => {
  
  const {getItem} = useStorage()
  
  const store = getItem('store') ? JSON.parse(getItem('store')).number: '0';
  
  const loggerInfo = async (program: string, message: string, trace: string ) => {
    
    const pid = DateTime.now().toMillis();

    const variables: LoggerInput = {
      logId: pid,
      program,
      message,
      level: 'info',
      trace,
      date: DateTime.now().toISO(),
      store
    }

    const addMutation = formatString(ADD_LOG_ITEM, variables)

    const {data, errors} = await proxyCalls(addMutation);

    if (errors) {
      console.log(errors);
    }

    if (data) {
      console.log(data)
    }
    
  }

  const loggerWarn = async ( program: string, message: string, trace: string ) => {
    
    const pid = DateTime.now().toMillis();
    
    const variables: LoggerInput = {
      logId: pid,
      program,
      message,
      level: 'warn',
      trace,
      date: DateTime.now().toISO(),
      store
    }
    
    const addMutation = formatString(ADD_LOG_ITEM, variables)
    
    const {data, errors} = await proxyCalls(addMutation);
    
    if (errors) {
      console.log(errors);
    }
    
    if (data) {
      console.log(data)
    }
  }
  
  const loggerError = async ( program: string, message: string, trace: string ) => {
    
    const pid = DateTime.now().toMillis();
    
    const variables: LoggerInput = {
      logId: pid,
      program,
      message,
      level: 'error',
      trace,
      date: DateTime.now().toISO(),
      store
    }
    
    const addMutation = formatString(ADD_LOG_ITEM, variables)
    
    const {data, errors} = await proxyCalls(addMutation);
    
    if (errors) {
      console.log(errors);
    }
    
    if (data) {
      console.log(data)
    }
  }
  
  const loggerTrace = async ( program: string, message: string, trace: string ) => {
    
    const pid = DateTime.now().toMillis();

    const variables:LoggerInput = {
      logId: pid,
      program,
      message,
      level: 'trace',
      trace,
      date: DateTime.now().toISO(),
      store
    }
    const addMutation = formatString(ADD_LOG_ITEM, variables)
    
    const {data, errors} = await proxyCalls(addMutation);
    
    if (errors) {
      console.log(errors);
    }
    
    if (data) {
      console.log(data)
    }
  }

  return {
    loggerInfo,
    loggerWarn,
    loggerError,
    loggerTrace
  }
}

export default useLogger;