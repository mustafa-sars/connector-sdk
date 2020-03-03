# Untitled object in undefined Schema

```txt
undefined#/$definitions/repository/properties/attributes/properties/owner
```

The owning entity of the repository - usually an organization or a user.


| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                            |
| :------------------ | ---------- | -------------- | ------------ | :---------------- | --------------------- | ------------------- | ----------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [records.json\*](records.json "open original schema") |

## owner Type

`object` ([Details](records-definitions-repository-properties-attributes-properties-owner.md))

# undefined Properties

| Property                | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                        |
| :---------------------- | -------- | -------- | -------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [id](#id)               | `string` | Required | cannot be null | [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-id.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/id")               |
| [type](#type)           | `string` | Required | cannot be null | [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-type.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/type")           |
| [name](#name)           | `string` | Required | cannot be null | [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-name.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/name")           |
| [htmlUrl](#htmlUrl)     | `string` | Optional | cannot be null | [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-htmlurl.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/htmlUrl")     |
| [avatarUrl](#avatarUrl) | `string` | Optional | cannot be null | [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-avatarurl.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/avatarUrl") |

## id

The id of the owner.


`id`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-id.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/id")

### id Type

`string`

## type

What type of owner this is.


`type`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-type.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/type")

### type Type

`string`

### type Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value            | Explanation |
| :--------------- | ----------- |
| `"user"`         |             |
| `"organization"` |             |

## name

The owner's canonical name, e.g. a username.


`name`

-   is required
-   Type: `string`
-   cannot be null
-   defined in: [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-name.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/name")

### name Type

`string`

## htmlUrl

A web URL for this owner.


`htmlUrl`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-htmlurl.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/htmlUrl")

### htmlUrl Type

`string`

### htmlUrl Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")

## avatarUrl

An avatar for this owner.


`avatarUrl`

-   is optional
-   Type: `string`
-   cannot be null
-   defined in: [Untitled schema](records-definitions-repository-properties-attributes-properties-owner-properties-avatarurl.md "undefined#/$definitions/repository/properties/attributes/properties/owner/properties/avatarUrl")

### avatarUrl Type

`string`

### avatarUrl Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc4291 "check the specification")
