// FormDataContext.js

import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    subcategory: '',
    brand: '',
    negotiable: '',
    model: '',
    price: '',
    description: '',
    tags: [],
    AdName: ''
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
