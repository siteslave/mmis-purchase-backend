'use strict';

import * as express from 'express';
import * as moment from 'moment';
import { PurchasingOrderItemModel } from '../models/purchasingOrderItem';
import util = require('util')

const router = express.Router();
const model = new PurchasingOrderItemModel();

router.get('/', (req, res, next) => {

  let db = req.db;

  model.list(db, 100)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

router.get('/byorderid', (req, res, next) => {

  let db = req.db;
  let id = req.query.id;

  model.listByorderid(db, id, 100)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

router.get('/product-history/:id', (req, res, next) => {

  let db = req.db;
  let id = req.params.id;

  model.listByProductId(db, id, 100)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

router.get('/byorderid-norelation/:id', (req, res, next) => {

  let db = req.db;
  let id = req.params.id;

  model.listByorderidNoRelation(db, id)
    .then((results: any) => {
      res.send({ ok: true, rows: results });
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

router.post('/', (req, res, next) => {
  let data = model.load(req);
  console.log(data)
  let db = req.db;
  model.save(db, data)
    .then((results: any) => {
      res.send({ ok: true })
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });

});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let data = model.load(req);
  let db = req.db;
  if (id) {
    model.update(db, id, data)
      .then((results: any) => {
        res.send({ ok: true })
      })
      .catch(error => {
        res.send({ ok: false, error: error })
      })
      .finally(() => {
        db.destroy();
      });
  }
});

router.get('/detail/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;

  model.detail(db, id)
    .then((results: any) => {
      res.send({ ok: true, detail: results[0] })
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });

});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  let db = req.db;

  model.remove(db, id)
    .then((results: any) => {
      res.send({ ok: true })
    })
    .catch(error => {
      res.send({ ok: false, error: error })
    })
    .finally(() => {
      db.destroy();
    });
});

router.post('/deleteall', async (req, res, next) => {
  let id = req.body.ids;
  let db = req.db;

  console.log(id);

  try {
    await model.removeAll(db, id);
    res.send({ ok: true });
  } catch (error) {
    res.send({ok: false, error: error.message});
  } finally {
    db.destroy();
  }
});


export default router;