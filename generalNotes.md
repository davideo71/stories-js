

-----------------------------------
What's in store? 


    -store
            canvas                      - object
                window/react3           - object
                    width               - integer
                    height              - integer
                    antialias           - Boolean
                    pixelratio          - float
                    maincamera          - string?
                    clearcolor          - color

                camera                  - object
                    type                - string
                    fov                 - {object} number
                    aspect              - integer                   //maybe float works too
                    near                - integer
                    far                 - string
                    nameposition        - vector3
                    lookat              - vector3

            lines                       - object
                nextId                  - integer

                items                   - object
                    line                - object                    //about a line
                        ID              - integer
                        startNode       - nodeID
                        endNode         - nodeID
                        color           - color
                        transitionType  - "type"
                        
                    line... (another one like it)

            nodes                       - object   
                nextId                  - integer                   //maybe we should store this somewhere else and keep the items clean?
                
                items                   - object                    //collection of nodes key-value pairs
                    Node                - ID     
                        name            - string
                        id              - integer                   //we could just use the name too and not have this here?
                        position        - array of 3 values         //should eventually be a vector?
                        size            - array of 2 values
                        color           - color
                        imageName       - string
                        selected        - Boolean                   //lets us know if this is the node that's currently selected
                        linesOut        - [lineID's]                //these keep track of the lines that are affected when the node is moved or deleted
                        linesIN         - [lineID's]

                    Node...(another node like it)
                
            user (object)
        

