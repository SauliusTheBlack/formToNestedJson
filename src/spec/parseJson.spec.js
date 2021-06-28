const parser = require("../jsonParser.js");
describe('parsing json', ()=>{
    it('should add a top level item if the name does not contain a dot', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"firstName",
            "value":"Peter"},
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
      expect(json["firstName"]).toBe("Peter");
      
    })
  
    it('should add a top level item if the name does not contain a dot: 2 elements', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"firstName",
            "value":"Peter"},
            {"name":"lastName",
            "value":"De Coninck"},
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
      expect(json["firstName"]).toBe("Peter");
      expect(json["lastName"]).toBe("De Coninck");
      
    })


//   describe('parsing json', ()=>{
    it('should add a nested item if the name contains a dot', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"attendee.firstName",
            "value":"Peter"}
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
      expect(json["attendee"].constructor).toBe(Object);
      expect(json["attendee"]["firstName"]).toBe("Peter");
      
    })

    it('should add a nested item if the name contains a dot; multiple occurrences', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"attendee.firstName",
            "value":"Peter"},
            {"name":"attendee.lastName",
            "value":"De Coninck"}
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
      expect(json["attendee"].constructor).toBe(Object);
      expect(json["attendee"]["firstName"]).toBe("Peter");
      expect(json["attendee"]["lastName"]).toBe("De Coninck");
      
    })

    it('should add a second level of nesting if 2 dots are available', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"attendees.first.firstName",
            "value":"Peter"},
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
        expect(json["attendees"].constructor).toBe(Object);
        expect(json["attendees"]["first"].constructor).toBe(Object);
        expect(json["attendees"]["first"]["firstName"]).toBe("Peter");
      
    })
    it('should add a second level of nesting if 2 dots are available: multiple values in same nest', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"attendees.first.firstName",
            "value":"Peter"},
            {"name":"attendees.first.lastName",
            "value":"De Coninck"},
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
        expect(json["attendees"].constructor).toBe(Object);
        expect(json["attendees"]["first"].constructor).toBe(Object);
        expect(json["attendees"]["first"]["firstName"]).toBe("Peter");
        expect(json["attendees"]["first"]["lastName"]).toBe("De Coninck");
      
    })

    it('should add a second level of nesting if 2 dots are available: multiple values in multiple nests', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"attendees.first.firstName",
            "value":"Peter"},
            {"name":"attendees.first.lastName",
            "value":"De Coninck"},
            {"name":"attendees.second.firstName",
            "value":"Ellen"},
            {"name":"attendees.second.lastName",
            "value":"Plateus"},
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
        expect(json["attendees"].constructor).toBe(Object);
        expect(json["attendees"]["first"].constructor).toBe(Object);
        expect(json["attendees"]["first"]["firstName"]).toBe("Peter");
        expect(json["attendees"]["first"]["lastName"]).toBe("De Coninck");
        expect(json["attendees"]["second"].constructor).toBe(Object);
        expect(json["attendees"]["second"]["firstName"]).toBe("Ellen");
        expect(json["attendees"]["second"]["lastName"]).toBe("Plateus");
      
    })

    it('should add a list if there is a number in there', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"attendees.0.firstName",
            "value":"Peter"},
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
        expect(Array.isArray(json["attendees"])).toBe(true);
        // console.log(json["attendees"][0]);
        expect(json["attendees"][0].constructor).toBe(Object);
        expect(json["attendees"][0]["firstName"]).toBe("Peter");
      
    })

    it('should add to object in list if there is a number with multiple values in there', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"attendees.0.firstName",
            "value":"Peter"},
            {"name":"attendees.0.lastName",
            "value":"De Coninck"},
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
        expect(Array.isArray(json["attendees"])).toBe(true);
        // console.log(json["attendees"][0]);
        expect(json["attendees"][0].constructor).toBe(Object);
        expect(json["attendees"][0]["firstName"]).toBe("Peter");
        expect(json["attendees"][0]["lastName"]).toBe("De Coninck");
      
    })

    it('should add to existing list if there are multiple numbers in there', ()=>{
        let flatArrayJson = [ //the way a form gets serialized
            {"name":"attendees.0.firstName",
            "value":"Peter"},
            {"name":"attendees.1.firstName",
            "value":"Ellen"},
        ];

        let json = parser.parseJsonFromForm(flatArrayJson);
     
        expect(Array.isArray(json["attendees"])).toBe(true);
        // console.log(json["attendees"][0]);
        expect(json["attendees"][0].constructor).toBe(Object);
        expect(json["attendees"][1].constructor).toBe(Object);
        expect(json["attendees"][0]["firstName"]).toBe("Peter");
        expect(json["attendees"][1]["firstName"]).toBe("Ellen");
      
    })
  })
