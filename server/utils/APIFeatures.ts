interface IAPIFeatures {
  query: any;
  queryString: any;

  sort(): APIFeatures;
  paginate(): APIFeatures;
  limitFields(): APIFeatures;
}

class APIFeatures implements IAPIFeatures {
  public query: any;
  public queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  // /users?sort=name,email
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  // /users?page=2&limit=10
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  // /users?fields=name,email,address
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }
}

export default APIFeatures;
