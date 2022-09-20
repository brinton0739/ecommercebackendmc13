const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product
      }
    ]
  })
  .then((tag) => {
    res.json(
      tag.map((t) => {
        return t.get();
      })
    )
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:tag_id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.tag_id, {
    include: [
      {
        model: Product
      }
    ]
  })
  .then((result) => {
    res.json(result.get());
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((result) => {
    if (result) {
      res.json(result.get());
    } else {
      res.status(400).json('{}');
    }
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json(err);
  });
});

router.put('/:tag_id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.tag_id
    }
  })
  .then(() => {
    return Tag.findByPk(req.params.tag_id);
  })
  .then((result) => {
    if (result) {
      res.json(result.get());
    } else {
      res.status(404).json('{}');
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:tag_id', (req, res) => {

  Tag.destroy({

    where: {
      id: req.params.tag_id
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
  // delete on tag by its `id` value


module.exports = router;
