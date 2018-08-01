export default [
    `
        type PropertyInput {
		    properties: [Property]
        }
        
	    type Property {
            name: String
		    type: String
		    addedAt: String
		    fromGameVersion: String
		    isPersonal: Boolean
        }
    `
];
