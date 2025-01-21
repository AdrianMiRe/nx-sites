const numberFormatter = (value: number) => {

  const numberFormatter = Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    currencyDisplay: 'narrowSymbol'
  });

  return numberFormatter.format(value);
}

export default numberFormatter;