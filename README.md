# Second version of to-do-list
 
`<App/>` component consist of a router that's why in the next fuw paragrapghs there is explanation s about routs of the interface.

## Rout /

Element `<RootLayout/>` that contains header of page.

## Rout /lists

Element `<AllListPage/>` that contains list of users lists.

There are also several sub routs that are used to open modals that give posibilities to perform CRUD operations with list

### Sub rout /lists/add-list

Element `<AddListPage/>` that contains form for adding new list in a list of users list

### Sub rout /lists/edit-list

Element `<EditListPage/>` that contains form for editing new list in a list of users list

### Sub rout /lists/delete-list

Element `<DeleteListPage/>` that contains confirm modal for list delete

## Rout /lists/:id

Elenment `<ListPage/>` that shows up list iformation and list of list as aside menu