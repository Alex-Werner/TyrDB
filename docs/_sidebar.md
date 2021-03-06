- Getting started
    - [Quick start](getting-started/quickstart.md)
    - [Queries](getting-started/queries.md)
- Usage 
    - [Adapters](usage/adapters.md)
    - [Examples](usage/examples.md)
- Adapters 
    - FsAdapter
        - [`new FsAdapter()`](adapters/FsAdapter/FsAdapter.md)
    - MemoryAdapter
        - [`new MemoryAdapter()`](adapters/MemoryAdapter/MemoryAdapter.md)
- Types
   - TyrDB       
       - [`.new TyrDB()`](types/TyrDB/TyrDB.md)
           - [`.close()`](types/TyrDB/methods/close.md)
           - [`.connect()`](types/TyrDB/methods/connect.md)
           - [`.db()`](types/TyrDB/methods/db.md)
           - [`.disconnect()`](types/TyrDB/methods/disconnect.md)
           - [`.initialize()`](types/TyrDB/methods/initialize.md)
           - [`.serializeMeta()`](types/TyrDB/methods/serializeMeta.md)
    - Database
        - [`new Database()`](types/Database/Database.md)
            - [`.collection()`](types/Database/methods/collection.md)
            - [`.export()`](types/Database/methods/export.md)
            - [`.list()`](types/Database/methods/list.md)
    - Collection
        - [`new Collection()`](types/Collection/Collection.md)
            - [`.export()`](types/Collection/methods/export.md)
            - [`.find()`](types/Collection/methods/find.md)
            - [`.findOne()`](types/Collection/methods/findOne.md)
            - [`.findOneAndDelete()`](types/Collection/methods/findOneAndDelete.md)
            - [`.findOneAndReplace()`](types/Collection/methods/findOneAndReplace.md)
            - [`.findOneAndUpdate()`](types/Collection/methods/findOneAndUpdate.md)
            - [`.get()`](types/Collection/methods/get.md)
            - [`.insert()`](types/Collection/methods/insert.md)
            - [`.insertMany()`](types/Collection/methods/insertMany.md)
            - [`.insertOne()`](types/Collection/methods/insertOne.md)
            - [`.remove()`](types/Collection/methods/remove.md)
            - [`.replace()`](types/Collection/methods/replace.md)
    - Document
        - [`new Document()`](types/Document/Document.md)
            - [`.serialize()`](types/Document/methods/serialize.md)
            - [`.update()`](types/Document/methods/update.md)
    - Errors 
    - PersistanceAdapter
        - [`.new PersistanceAdapter()`](types/PersistanceAdapter/PersistanceAdapter.md)
    
    - Events
        - [`ready`](events/ready.md)
- [License](#license)
