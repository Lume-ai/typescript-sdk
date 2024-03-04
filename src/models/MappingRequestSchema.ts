/**
 * An object that displays the mapped record of the data from the job
 */
export type MappingRequestSchema = {
    /**
     * The index of the record in the data
     */
    index: number;
    /**
     * The source record of the data. This is optional and can be retrieved from the provided index.
     */
    source_record: Record<string, any>;
    /**
     * The target record of the data
     */
    mapped_record: Record<string, any>;
};

