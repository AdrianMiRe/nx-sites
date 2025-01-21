export interface Product {
  id: string;
  name: string;
  sku: string;
  price: {
    regularPrice: {
      amount: {
        value: number;
        currency: string;
      };
    };
  };
}

// For autocomplete search results
export interface ProductProps {
  id: number
  name: string
  price_range: {
    maximum_price: {
      discount: {
        amount_off: number
        percent_off: number
      }
      final_price: {
        value: number
        currency: string
      }
      regular_price: {
        value: number
        currency: string
      }
    }
  }
  small_image: {
    url: string
  }
  uid: string
  url_key: string
}

// For autocomplete render
export interface AutocompleteProps {
  id: number
  label: string
  originalPrice: {
    currency: string
    value: number
  }
  finalPrice: {
    value: number
  }
  url_key: string
}

// For product details page

export interface Gallery {
  label: string
  url: string
}

export interface Attributes {
  attribute_metadata: {
    code: string
    label: string
  }
  entered_attribute_value: {
    value: string
  }
  selected_attribute_options: {
    attribute_option: [{
      uid: string
      label: string
    }]
  }
}

export interface ItemProps {
  id: number
  sku: string
  media_gallery: Gallery[]
  name: string
  description: {
    html: string
  }
  price_range: {
    maximum_price: {
      regular_price: {
        currency: string
        value: number
      }
      final_price: {
        currency: string
        value: number
      }
    }
  }
  custom_attributes: Attributes[]
  Indicado_para1: number
}

export interface PdpProps {
  attributes: [{
    label: string
    value: string
  }]
  descripcion: string
  finalPrice: {
    currency: string
    value: number
  }
  id: number
  images: [{
    image: string
    text: string
  }] 
  name: string
  originalPrice: {
    currency: string
    value: number
  }
  sku: string
  indicadoPara: number
  marca: string
}