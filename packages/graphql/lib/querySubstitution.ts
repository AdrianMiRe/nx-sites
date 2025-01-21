const querySubstitution = (template: string, values: Record<string, any>) => {
  return template.replace(/{(\w+)}/g, (match, key) => {
    let value = values[key];
    if (typeof value === "string") {
      // Escape double quotes in string values
      value = value.replace(/"/g, '\\"');
      return `"${value}"`; // Wrap strings in quotes
    }
    if (typeof value === "object") {
      return JSON.stringify(value).replaceAll('"', '')
    }
    return value !== undefined ? value : match;
  });
};

export default querySubstitution;