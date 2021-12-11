export default function prepareHtml(item) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <title>Document</title>
</head>

<body>
    <header>

    </header>
    <main>
        <div class="main_form">
            <label>Name:</label>
            <input type="text" class="form_input" id="name_field">
            <label>Price:</label>
            <input type="text" class="form_input" id="price_field">
            <button type="button" id="post_btn">PUT</button>
        </div>
        <div class="item_page">
            <div># ${item.id || "no id"}</div>
            <div class="item_title">Name: ${item.name || "no name"}</div>
            <div class="item_subtitle">Price: ${item.price || "no price"}</div>
        </div>
    </main>

    <script src="items.js" type="module"></script>
</body>

</html>
    
    `
}