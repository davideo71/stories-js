-----------------------------------
What's in store?

Store
    canvas (object)
        window/react3 (object)
            width
            height
            antialias
            pixelratio
            maincamera
            clearcolor

        camera (object)
            type            - string
            fov             - {object} number
            aspect          - integer (maybe float works too)
            near            - integer
            far             - string
            nameposition    - vector3
            lookat          - vector3
        
    nodes (object)                              //or is it items, i'm confused   
        nextId (integer)                        //maybe we should store this somewhere else and keep the items clean?
        
        Node (object with the id as the name)    
            name            -string
            id              -int                //we could just use the name too and not have this here?
            position        -array of 3 values  //should eventually be a vector?
            size            -array of 2 values
            color           -color
            imageName       -string
        
        Node...(another node like it)
        
    user (object)
        
