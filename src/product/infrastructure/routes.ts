import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import {
  adminCookies,
  jwtAdminPayload,
} from "src/admin/infrastructure/Adminservice";
import {
  productFilter,
  updateProductFilter,
  changecuantityFilter,
  changePriceFilter,
  changeImage,
  changeOffertFilter,
} from "src/product/application/filter";
import {
  Category,
  ErrorProduct,
  ProductAdapter,
} from "./serviceProduct";

type Variables = {
  jwtPayload: jwtAdminPayload;
};
//------------------
export const ProductRoutes = new Hono<{ Variables: Variables }>().basePath(
  "/product",
);

//---delete---
ProductRoutes.delete(
  "/delete/:id",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  async (c) => {
    try {
      const id = c.req.param("id");
      if (id === undefined) {
        return c.json({ message: "id es undefined" }, 400);
      }
      const resp = await ProductAdapter.deleteProduct(parseInt(id));
      if (resp instanceof ErrorProduct) {
        return c.json({ message: resp.messageError }, 400);
      }
    } catch {
      return c.json({ message: "error" }, 400);
    }
  },
);
//-----get--acceso--libre
ProductRoutes.get("/find_byId/:id", async (c) => {
  try {
    const id = c.req.param("id");
    if (id === undefined) {
      return c.json({ message: "id es undefined" }, 400);
    }
    const resp = await ProductAdapter.findby_id(parseInt(id));
    if (resp instanceof ErrorProduct) {
      return c.json({ message: resp.messageError }, 400);
    }
    return c.json(resp, 400);
  } catch {
    return c.json({ message: "error" }, 400);
  }
});
//--------
ProductRoutes.get("/find_name", async (c) => {
  try {
    const name = c.req.query("name");
    if (name === undefined) {
      return c.json({ message: "id es undefined" }, 400);
    }
    const resp = await ProductAdapter.findby_name(name);
    if (resp instanceof ErrorProduct) {
      return c.json({ message: resp.messageError }, 400);
    }
    return c.json(resp, 400);
  } catch {
    return c.json({ message: "error" }, 400);
  }
});
//---------
ProductRoutes.get("/findby_category", async (c) => {
  try {
    const category = c.req.query("name");
    const row = c.req.query("name");
    if (category === undefined) {
      return c.json({ message: "id es undefined" }, 400);
    }
    const rownumber = row === undefined ? undefined : parseInt(row);
    const resp = await ProductAdapter.findby_category(
      category as Category,
      rownumber,
    );
    if (resp instanceof ErrorProduct) {
      return c.json({ message: resp.messageError }, 400);
    }
    return c.json(resp, 400);
  } catch {
    return c.json({ message: "error" }, 400);
  }
});
//--------
ProductRoutes.get("/findby_price_range", async (c) => {
  try {
    const init = c.req.query("init");
    const final = c.req.query("final");
    const row = c.req.query("name");
    if (init === undefined || final === undefined) {
      return c.json({ message: "id es undefined" }, 400);
    }
    const rownumber = row === undefined ? undefined : parseInt(row);
    const resp = await ProductAdapter.findby_price_range(
      parseInt(init),
      parseInt(final),
      rownumber,
    );
    if (resp instanceof ErrorProduct) {
      return c.json({ message: resp.messageError }, 400);
    }
    return c.json(resp, 400);
  } catch {
    return c.json({ message: "error" }, 400);
  }
});
//--------
ProductRoutes.get("/findby_offert", async (c) => {
  try {
    const category = c.req.query("init");
    const row = c.req.query("name");
    if (category === undefined) {
      return c.json({ message: "id es undefined" }, 400);
    }
    const rownumber = row === undefined ? undefined : parseInt(row);
    const resp = await ProductAdapter.findby_offert(
      category as Category,
      rownumber,
    );
    if (resp instanceof ErrorProduct) {
      return c.json({ message: resp.messageError }, 400);
    }
    return c.json(resp, 400);
  } catch {
    return c.json({ message: "error" }, 400);
  }
});
//----post----
ProductRoutes.post(
  "/create",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", productFilter),
  async (c) => {
    const product = c.req.valid("json");
    try {
      const resp = await ProductAdapter.createProduct(product);
      if (resp instanceof ErrorProduct) {
        return c.json({ message: resp.messageError }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo crear el admin" }, 400);
    }
  },
);

//---put------
ProductRoutes.put(
  "/update",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", updateProductFilter),
  async (c) => {
    const productObj = c.req.valid("json");
    try {
      const resp = await ProductAdapter.updateProduct(
        productObj.productId,
        productObj,
      );
      if (resp instanceof ErrorProduct) {
        return c.json({ message: resp.messageError }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo crear el admin" }, 400);
    }
  },
);
//------------------------
ProductRoutes.put(
  "/changeImages",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", changeImage),
  async (c) => {
    const { productId, imageArr } = c.req.valid("json");
    try {
      const resp = await ProductAdapter.changeImages(productId, imageArr);
      if (resp instanceof ErrorProduct) {
        return c.json({ message: resp.messageError }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo crear el admin" }, 400);
    }
  },
);

//---------------
ProductRoutes.put(
  "/changeOffert",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", changeOffertFilter),
  async (c) => {
    const { productId, offert, offertPercent } = c.req.valid("json");
    try {
      const resp = await ProductAdapter.changeOffert(
        productId,
        offert,
        offertPercent,
      );
      if (resp instanceof ErrorProduct) {
        return c.json({ message: resp.messageError }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo crear el admin" }, 400);
    }
  },
);

//-----------
ProductRoutes.put(
  "/changePrice",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", changePriceFilter),
  async (c) => {
    const { productId, price } = c.req.valid("json");
    try {
      const resp = await ProductAdapter.changePrice(productId, price);
      if (resp instanceof ErrorProduct) {
        return c.json({ message: resp.messageError }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo crear el admin" }, 400);
    }
  },
);
//-------------------------
ProductRoutes.put(
  "/changeQuantity",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", changecuantityFilter),
  async (c) => {
    const { productId, quantity } = c.req.valid("json");
    try {
      const resp = await ProductAdapter.changeQuantity(productId, quantity);
      if (resp instanceof ErrorProduct) {
        return c.json({ message: resp.messageError }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo crear el admin" }, 400);
    }
  },
);
