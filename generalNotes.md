-----------------------------------
What's in store?

Store
    canvas (object)

    nodes (object)                              //or is it items, i'm confused
        
        nextId (integer)                        //maybe we should store this somewhere else and keep the items clean?
        
        Node (object with the id as the name)    
            name (string)
            id (int)                            //we could just use the name too and not have this here?
            position (array of 2 values)        //should eventually  be 3
            size     (array of 2 values)
            color    (color)
            imageName (string)
        
        Node...(another node like it)
        
    user (object)
