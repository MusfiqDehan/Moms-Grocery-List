import "./index.css";
import { useState } from "react";
import { defaultItems } from "./data";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

const App = () => {
    const [items, setItems] = useState(defaultItems);

    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);
        localStorage.setItem("groceryItems", JSON.stringify(listItems));
    };

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
        localStorage.setItem("groceryItems", JSON.stringify(listItems));
    };

    return (
        <div className="App">
            <Header title="Mom's Grocery" />
            <Content
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
            <Footer totalItems={items.length} />
        </div>
    );
};

export default App;
