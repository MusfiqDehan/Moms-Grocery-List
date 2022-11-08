import "./index.css";
import { useEffect, useState } from "react";
// import { defaultItems } from "./data";
import Header from "./components/Header";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import Content from "./components/Content";
import Footer from "./components/Footer";

const App = () => {
    // States
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("groceryItems")) || []
    );
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.setItem("groceryItems", JSON.stringify(items));
    }, [items]);

    // Functions
    const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setItems(listItems);
    };

    // Event Handler Functions
    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);
    };

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
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
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem search={search} setSearch={setSearch} />
            <Content
                items={items.filter((item) =>
                    item.item.toLowerCase().includes(search.toLowerCase())
                )}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
            <Footer totalItems={items.length} />
        </div>
    );
};

export default App;
