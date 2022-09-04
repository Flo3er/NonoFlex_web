import Instance from "./ApiInstance";

async function CompanyPost(
  name,
  type,
  category,
  active
) {
  try {
    const response = await Instance.post("/api/v1/company", {
        name: name,
        type: type,
        category: category,
        active: active
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const CompanyGet = async (companyId) => {
  try {
    const response = await Instance.get(`/api/v1/company/${companyId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

async function CompanyPut(companyId, name, type, category, active) {
  try {
    const response = await Instance.put(`/api/v1/company/${companyId}`, {
        name: name,
        type: type,
        category: category,
        active: active
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function CompanyDelete(companyId) {
  try {
    const response = await Instance.delete(`/api/v1/company/${companyId}`, {});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const CompanyMethod = {
    CompanyPost,
    CompanyGet,
    CompanyPut,
    CompanyDelete
};

export default CompanyMethod;
