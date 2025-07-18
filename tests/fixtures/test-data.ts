export const viewports = [
  { name: "desktop", width: 1920, height: 1080 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 },
];

export const sortOptions = [
  { 
    value: 'az', 
    name: 'Name (A to Z)', 
    type: 'name', 
    order: 'asc' 
  },
  { 
    value: 'za', 
    name: 'Name (Z to A)', 
    type: 'name', 
    order: 'desc' 
  },
  { 
    value: 'lohi', 
    name: 'Price (low to high)', 
    type: 'price', 
    order: 'asc' 
  },
  { 
    value: 'hilo', 
    name: 'Price (high to low)', 
    type: 'price', 
    order: 'desc' 
  }
];

export const STANDARD_USER = {
  username: "standard_user",
  password: "secret_sauce",
};

export const PRODUCTS = {
  backpack: {
    name: "Sauce Labs Backpack",
    description:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    price: "$29.99",
    quantity: "1",
  },
  onisie: {
    name: "Sauce Labs Onesie",
    description:
      "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
    price: "$7.99",
    quantity: "1",
  }
};


export const USER_DATA = {
  firstName: 'Mary',
  lastName: 'Doe',
  zipCode: '123456'
}
  

