import "./index.css";
import { useState } from "react";
// import { defaultItems } from "./data";
import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Content from "./components/Content";
import Footer from "./components/Footer";

const App = () => {
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("groceryItems"))
    );
    const [newItem, setNewItem] = useState("");

    const setAndSaveItems = (newItems) => {
        setItems(newItems);
        localStorage.setItem("groceryItems", JSON.stringify(newItems));
    };

    const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setAndSaveItems(listItems);
    };

    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setAndSaveItems(listItems);
    };

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setAndSaveItems(listItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
        setNewItem("");
    };

    return (
        <div className="App">
            <Header title="Mom's Grocery" />
            <SearchItem />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
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
