import type { JwtFieldSchema } from '../../types/plugins/jwt'

export const jwtSchema: JwtFieldSchema = {
  fields: [
    {
      key: {
        submitWhenNull: false,
        hint: `A unique string identifying the credential. If left out, it will
               be auto-generated.`,
      },
    },
    {
      algorithm: {
        order: 1,
        hint: 'The algorithm used to verify the token’s signature.',
      },
    },
    {
      rsa_public_key: {
        order: 2,
        type: 'textArea',
        label: 'RSA public-key',
        hint: `If algorithm is RSA or ECDSA, the public key (in PEM format) to
        use to verify the token’s signature.`,
        rows: 10,
        visible: (model) => {
          return model && model.algorithm && /(ES|RS)[\d]{3}/.test(model.algorithm)
        },
      },
    },
    {
      secret: {
        inputType: 'password',
        hint: `If algorithm is HMAC, the secret used to sign JWTs for
               this credential. If left out, will be auto-generated.`,
      },
    }],
}
