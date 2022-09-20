const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const results = await Category.findAll();

    if(results) {
        res.status(200).json(
          results.map((r) => {
            return r.get({plain:true});
          })
        );
    } else {
        res.status(200).json([]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const result = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    });
    if (result) {
      res.status(200).json(result.get({plain: true}));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((result) => {
    if (result) {
      res.status(200).json(result.get());
    } else {
      res.status(404).json('{}');
    }
  })
  .catch((err) => {res.status(500).json(err)});
});

router.put('/:category_id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name: req.body.category_name}, {
    where: {
      id: req.params.category_id
    }
  })
  .then((result) => {
      return Category.findByPk(req.params.category_id);
  })
  .then((result) => {
      if (result) {
        res.json(result.get());
      } else {
        res.status(404).json('{}');
      }
  })
  .catch((err) => {res.status(500).json(err)});
});

router.delete('/:category_id', (req, res) => {

  Category.destroy({

    where: {
      id: req.params.category_id
    }
  })
  .then((results) => {
    if(results) {
      res.status(200).json('{}');
    } else {
      res.status(404).json('{}');
    }
  })
  .catch((err) => {res.status(400).json(err)});
  });

module.exports = router;
