import Field from "../Inputs/Field.jsx";
import FiltersBase from "../FiltersBase.jsx";

const UserFilters = ({userId, setUserId, phone, setPhone, email, setEmail, updateQueryParams, clearQueryParams}) => {
    return (
        <FiltersBase updateQueryParams={updateQueryParams} clearQueryParams={clearQueryParams}>
            <Field value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="ID Користувача"/>
            <Field value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Номер телефону"/>
            <Field value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Пошта"/>
        </FiltersBase>
    )
}

export default UserFilters;
