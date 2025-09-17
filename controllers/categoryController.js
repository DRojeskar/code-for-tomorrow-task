const connection = require('../config/db');


exports.createCategory = async(req, res) => {
    const {name} = await req.body;
    console.log(name,"name")
    connection.query("INSERT INTO categories (name) VALUES (?)",[name],(e, result) => {
        if (err) return res.status(500).json({ message: e.message});
        
        return res.json({id:result.insertId, name });
    });
};


exports.getAllCategories = (req, res) => {
    connection.query("SELECT * FROM categories", (e, results) => {

        if (err) return res.status(500).json({message:e.message});
        return res.json(results);
    });
};


exports.updateCategory = async(req, res) => {
    const {categoryId} =await req.params;
    const { name} =await  req.body;
    console.log(name)
    connection.query("UPDATE categories SET name = ? WHERE id = ?", [name, categoryId], (e, result) => {
        if (err) return res.status(500).json({message:e.message});
        return res.json({message:"Category updated"});
    });
};


exports.deleteCategory = async(req, res) => {
    const { categoryId } = await req.params;
    console.log(categoryId)
    connection.query("SELECT * FROM services WHERE category_id = ?",[categoryId], (e, results) => {
        if (err) return res.status(500).json({ message: e.message });


        if (results.length > 0) {
            return res.status(400).json({message:"Cannot delete category with services"});
        }

        connection.query("DELETE FROM categories WHERE id = ?",[categoryId], (e, result) => {
            if (e) return res.status(500).json({message: err.message });
           return res.json({message:"Category deleted"});
        });
    });
};
