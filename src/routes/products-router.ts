import { Request, Response, Router } from 'express';
import { verifyRoles } from '../middleware/verifyRoles';
import { ROLES_LIST } from '../config/roles-list';

export const productRoutes = Router({});

const products = [
  {
    id: 1,
    name: 'toy',
    price: 100,
  },
  {
    id: 5,
    name: 'tomato',
    price: 100,
  },
];

productRoutes.get('/', (req: Request, res: Response) => {
  const title = req.query.title;
  if (title) {
    const filteredProducts = products.filter((p) => p.name.includes(title as string));
    res.send(filteredProducts);
  }
  res.send(products);
});

productRoutes.post('/', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR), (req: Request, res: Response) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).send(products);
});

productRoutes.get('/:title', (req: Request, res: Response) => {
  const product = products.find((p) => p.name === req.params.title);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send('not found');
  }
});

productRoutes.delete('/:id', verifyRoles(ROLES_LIST.ADMIN), (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === +id) {
        products.splice(i, 1);
        res.status(201).send('success');
        return;
      }
    }
  }
  res.status(404).send('product not found ');
});

productRoutes.put('/:id', verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR), (req: Request, res: Response) => {
  const id = req.params.id;
  const title = req.body.title;
  const modifiedproduct = products.find((p) => p.id === +id);
  if (modifiedproduct) {
    modifiedproduct.name = title;
    res.send(modifiedproduct);
  } else {
    res.status(404).send('not found');
  }
});
