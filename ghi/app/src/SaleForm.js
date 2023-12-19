import React, {useEffect, useState} from 'react';

function SaleForm() {
    const [autos, setAutos] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const handleAutomobileChange = (event) => {
        const v = event.target.value;
        setAutomobile(v);
    }
    const [salesperson, setSalesPerson] = useState('');
    const handleSPChange = (event) => {
        const v = event.target.value;
        setSalesPerson(v);
    }
    const [customer, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        const v = event.target.value;
        setCustomer(v);
    }
    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        const v = event.target.value;
        setPrice(v);
    }

    const fetchData = async () => {
        const autoUrl = "http://localhost:8100/api/automobiles/";
        const autoResponse = await fetch(autoUrl);
        if (autoResponse.ok) {
            const data = await autoResponse.json();
            const cars = data.autos.filter((auto) => auto["sold"] === false);
            setAutos(cars);
        }
        const spUrl = "http://localhost:8090/api/salespeople/";
        const spResponse = await fetch(spUrl);
        if (spResponse.ok) {
            const spData = await spResponse.json();
            setSalespeople(spData.salespeople);
        }
        const custUrl = "http://localhost:8090/api/customers/";
        const custResponse = await fetch(custUrl);
        if (custResponse.ok) {
            const custData = await custResponse.json();
            setCustomers(custData.customers);
        }
    }
    const logSale = async (a) => {
        const set = {};
        const autUrl = `http://localhost:8100${a}`;
        const autResponse = await fetch(autUrl);
        if (autResponse.ok) {
            const autData = autResponse.json();
            var color = autData.color;
            var year = autData.year;
        }
        set.sold = true;
        set.color = color;
        set.year = year;
        const atfetchConfig = {
            method: "PUT",
            body: JSON.stringify(set),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const atresponse = await fetch(autUrl, atfetchConfig);
        if (atresponse.ok) {
            console.log('changed sold to true')
            return 1;
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;
        const logged = await logSale(automobile);

        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);
            setAutomobile('');
            setSalesPerson('');
            setCustomer('');
            setPrice('');
        }
        if (logged) {
            fetchData();
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record New Sale</h1>
            <form onSubmit={handleSubmit} id="create-cust-form">
            <div className="mb-3">
                <select onChange={handleAutomobileChange} required id="automobile" name="automobile" className="form-select" value={automobile}>
                <option value="">Choose Automobile</option>
                {autos.map(auto => {
                    return (
                        <option key={auto.href} value={auto.href}>
                            {auto.vin}
                        </option>
                    )
                })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleSPChange} required id="salesperson" name="salesperson" className="form-select" value={salesperson}>
                <option value="">Salesperson</option>
                {salespeople.map(person => {
                    return (
                        <option key={person.id} value={person.id}>
                            {`${person.first_name} ${person.last_name}`}
                        </option>
                    )
                })}
                </select>
              </div>
              <div className="mb-3">
                <select onChange={handleCustomerChange} required id="customer" name="customer" className="form-select" value={customer}>
                <option value="">Customer</option>
                {customers.map(customer => {
                    return (
                        <option key={customer.id} value={customer.id}>
                            {`${customer.first_name} ${customer.last_name}`}
                        </option>
                    )
                })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePriceChange} placeholder="Price" required type="number" id="price" name="price" className="form-control" value={price}/>
                <label htmlFor="price">Price</label>
              </div>
              <button className="btn btn-primary">Record</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default SaleForm;
