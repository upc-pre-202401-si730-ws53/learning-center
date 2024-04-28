/**
 * Tutorial
 * @description Tutorial entity
 */
export class Tutorial {
    constructor(id, title, description, published) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.published = published;
        this.status = this.published === true ? 'Published' : 'Unpublished';
    }

    /**
     * Create a new Tutorial instance from a displayableTutorial
     * @param displayableTutorial - The displayableTutorial to create the Tutorial from
     * @returns {Tutorial}
     */
    static fromDisplayableTutorial(displayableTutorial) {
        return new Tutorial(
            displayableTutorial.id,
            displayableTutorial.title,
            displayableTutorial.description,
            displayableTutorial.status.label === 'Published');
    }

    /**
     * Convert an item to a displayable item
     * @param tutorial - The item to convert
     * @returns {{description: *, id, title, status: (string)}}
     */
    static toDisplayableTutorial(tutorial) {
        return {
            id: tutorial.id,
            title: tutorial.title,
            description: tutorial.description,
            status: tutorial.published === true ? 'Published' : 'Unpublished'
        };
    }

}