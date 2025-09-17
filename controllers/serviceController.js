const connection = require('../config/db');


exports.addService = async(req, res) => {
    const {categoryId} = await req.params;
    console.log(categoryId)


    const { name,type, priceOptions } = await req.body;

    connection.query("INSERT INTO services (category_id, name, type) VALUES (?, ?, ?)", [categoryId, name, type], (e, result) => {
        if (err) return res.status(500).json({message:e.message});

        const serviceId = result.insertId;
        console.log(serviceId)

        if (priceOptions && priceOptions.length > 0) {
            priceOptions.forEach(option => {
                connection.query("INSERT INTO service_prices (service_id, duration, price, type) VALUES (?, ?, ?, ?)", [serviceId, option.duration, option.price, option.type]);
            });
        }
       return res.json({id:serviceId,category_id:categoryId,name,type });
    });
};


exports.getServices =async (req, res) => {
    const {categoryId} = await req.params;
    console.log(categoryId)
    connection.query("SELECT * FROM services WHERE category_id = ?", [categoryId], (err, results) => {

        if (err) return res.status(500).json({ message: err.message});
        return res.json(results);
    });
};


exports.updateService = async(req, res) => {
    const { categoryId, serviceId } =await  req.params;

    const { name, type, priceOptions } =await req.body;
    console.log(name)

    connection.query("UPDATE services SET name = ?, type = ? WHERE id = ? AND category_id = ?", [name, type, serviceId, categoryId], (err, result) => {
        if (err) 
            return res.status(500).json({message:err.message });

        if (priceOptions && priceOptions.length > 0) {
            connection.query("DELETE FROM service_prices WHERE service_id = ?", [serviceId], (err) => {
                if (err) return res.status(500).json({message:err.message });
                priceOptions.forEach(option => {
                    connection.query("INSERT INTO service_prices (service_id, duration, price, type) VALUES (?, ?, ?, ?)", [serviceId, option.duration, option.price, option.type]);
                });
            });
        }
        return res.json({message:"Service updated"});
    });
};


exports.deleteService = async(req, res) => {
    const { categoryId, serviceId } = await req.params;

    console.log(req.params)
    connection.query("DELETE FROM services WHERE id = ? AND category_id = ?", [serviceId, categoryId], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Service deleted" });
    });
};
